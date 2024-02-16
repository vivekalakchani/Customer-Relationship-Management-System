import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prospect } from './entities/prospect.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { ContactCreatedEvent } from './dto/ContactCreatedEvent.dto';

@Injectable()
export class ProspectService {
  logger = new Logger('ProspectService');
  constructor(
    @InjectRepository(Prospect)
    private prospectRepository: Repository<Prospect>,
    @Inject('PROSPECT_SERVICE') private readonly prospectClient: ClientProxy,
  ) {}

  async create(createProspectDto: CreateProspectDto): Promise<Prospect> {
    const { prospectName, email, telNo, type } = createProspectDto;
    try {
      const { prospectId } = await this.generateProspectIdAndLatestProspect();

      const prospect = this.prospectRepository.create({
        prospectId,
        prospectName,
      });

      // Save the prospect to the database
      const savedProspect = await this.prospectRepository.save(prospect);

      const contactCreatedEvent = new ContactCreatedEvent(
        prospectId,
        email,
        telNo,
        type,
      );

      this.prospectClient.send(
        {
          cmd: 'add_contact',
        },
        contactCreatedEvent,
      );

      return savedProspect;
    } catch (error) {
      // Handle errors or rethrow
      throw error;
    }
  }

  async findAll() {
    return await this.prospectRepository.find({});
  }

  async findOne(prospectId: string) {
    const prospect = await this.prospectRepository.findOne({
      where: { prospectId },
    });

    if (!prospect) {
      throw new NotFoundException('prospect not found');
    }
    return prospect;
  }

  async update(prospectId: string, updateProspectDto: UpdateProspectDto) {
    const { status, active } = updateProspectDto;
    const existingProspect = await this.findOne(prospectId);

    existingProspect.status = status;
    existingProspect.active = active;
    await existingProspect.save();

    try {
      this.logger.log(`update ${prospectId} - loan details`);
      return existingProspect;
    } catch (error) {
      this.logger.error(`cannot update ${prospectId} - loan details`, error);
      return error;
    }
  }

  async remove(prospectId: string) {
    const existingProspect = await this.findOne(prospectId);

    if (existingProspect) {
      return this.prospectRepository.remove(existingProspect);
    } else {
      throw new NotFoundException(`Prospect with ID ${prospectId} not found`);
    }
  }

  private async generateProspectIdAndLatestProspect(): Promise<{
    prospectId: string;
  }> {
    try {
      const latestProspect = await this.prospectRepository.find({
        order: { id: 'DESC' },
      });
      const prospectId = latestProspect
        ? `PID${latestProspect[0].id + 1}`
        : 'PID1';
      return { prospectId };
    } catch (error) {
      console.error('Error finding last prospect:', error);
      throw error;
    }
  }
}
