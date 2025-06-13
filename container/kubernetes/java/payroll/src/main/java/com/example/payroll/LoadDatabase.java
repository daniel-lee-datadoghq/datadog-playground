package com.example.payroll;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.slf4j.Logger;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {

  private static final Logger logger = LogManager.getLogger(LoadDatabase.class);
  //private static final Logger logger = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(EmployeeRepository repository) {

    return args -> {
      logger.info("Preloading " + repository.save(new Employee("Bilbo Baggins", "burglar")));
      logger.info("Preloading " + repository.save(new Employee("Frodo Baggins", "thief")));
    };
  }
}