package com.ecommerce.app.repository;

import com.ecommerce.app.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends MongoRepository<ContactMessage, String> {
}
