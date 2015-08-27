package net.sandbox.dividend;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by kwang on 8/25/2015.
 */
public interface TickerRepository extends MongoRepository<TickerInfo, String> {
}
