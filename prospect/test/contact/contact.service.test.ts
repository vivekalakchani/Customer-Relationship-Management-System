
import { Injectable } from '@nestjs/common';
import { CreateContactDto } from '../../src/contact/dto/create-contact.dto';
import { UpdateContactDto } from '../../src/contact/dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../../src/contact/entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactCreatedEvent } from '../../src/contact/dto/ContactCreatedEvent.dto';
import { Test } from '@nestjs/testing';
import { ContactService } from '../../src/contact/contact.service';

describe('test ContactService', () => {
    let contactService: ContactService;
    
    class RepositoryMock {
    }
    
    beforeEach(async () => {
        const RepositoryProvider = { provide: 'Contact', useClass: RepositoryMock };
        
        const moduleRef = await Test.createTestingModule({ imports: [], controllers: [], providers: [
                ContactService,
                RepositoryProvider
            ] }).compile();
        
        contactService = moduleRef.get<ContactService>(ContactService);
    });
    
    test('ContactService business', async () => {
        // todo mock and test;
    });
});
