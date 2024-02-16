import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ContactCreatedEvent } from './dto/ContactCreatedEvent.dto';

@Controller('contact')
export class ContactController {
  private logger = new Logger('ContactController');

  constructor(private readonly contactService: ContactService) {}

  @MessagePattern({ cmd: 'add_contact' })
  async createContact(
    @Payload() data: ContactCreatedEvent,
    @Ctx() context: RmqContext,
  ) {
    const newContact = await this.contactService.createContact(data);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return newContact;
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
