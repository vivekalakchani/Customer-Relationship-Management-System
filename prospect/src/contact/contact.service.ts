import { Injectable, Logger } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactCreatedEvent } from './dto/ContactCreatedEvent.dto';

@Injectable()
export class ContactService {
  private logger = new Logger('ContactService');

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async createContact(data: ContactCreatedEvent) {
    const { prospectId, email, telNo, type } = data;

    // Generate a contact ID
    const { contactId } = await this.generateContactIdAndLatestContact();

    // Create a contact entity

    const contact = this.contactRepository.create({
      contactId: contactId,
      prospectId,
      email,
      telNo,
      type,
    });

    // Save the contact to the database
    const savedContact = await this.contactRepository.save(contact);
    this.logger.verbose(contact.contactId);
    // Return the saved contact
    return savedContact;
  }

  async findAll() {
    return await this.contactRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
  private async generateContactIdAndLatestContact(): Promise<{
    contactId: string;
  }> {
    try {
      const latestContact = await this.contactRepository.find({
        order: { id: 'DESC' },
      });
      const contactId = latestContact
        ? `CID${latestContact[0].id + 1}`
        : 'CID1';
      return { contactId };
    } catch (error) {
      console.error('Error finding last contact:', error);
      throw error;
    }
  }
}
