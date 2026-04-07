package com.edulibrary.config;

import com.edulibrary.model.Book;
import com.edulibrary.model.Course;
import com.edulibrary.model.User;
import com.edulibrary.repository.BookRepository;
import com.edulibrary.repository.CourseRepository;
import com.edulibrary.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, BookRepository bookRepository, CourseRepository courseRepository) {
        return args -> {
            // Seed Users
            if (userRepository.count() == 0) {
                userRepository.save(new User(null, "Alice Johnson", "alice@example.com", "password", "user", "Active", null));
                userRepository.save(new User(null, "Admin User", "admin@library.com", "password", "admin", "Active", null));
            }

            // Seed Books
            if (bookRepository.count() == 0) {
                bookRepository.save(new Book(null, "NIST Cybersecurity Framework", "NIST", "Computer Science", 4.9, "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600&h=800", "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.04162018.pdf", new java.util.HashSet<>()));
                bookRepository.save(new Book(null, "NIST SP 800-53 Rev 5", "NIST", "Computer Science", 4.8, "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=600&h=800", "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf", new java.util.HashSet<>()));
            }

            // Seed Courses
            if (courseRepository.count() == 0) {
                courseRepository.save(new Course(null, "Ethical Hacking Masterclass", "Cyber Ninjas", "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400", "25h", 80, "Hot", 
                    Arrays.asList(
                        "https://www.youtube.com/embed/fNzpcB7ODxQ", 
                        "https://www.youtube.com/embed/3Kq1MIfTWCE", 
                        "https://www.youtube.com/embed/dz7Ntp7KQGA"
                    )));
                
                courseRepository.save(new Course(null, "Advanced Penetration Testing", "Sec Masters", "https://images.unsplash.com/photo-1510511459019-5efa7ae17387?auto=format&fit=crop&q=80&w=600&h=400", "40h", 42, "Advanced", 
                    Arrays.asList(
                        "https://www.youtube.com/embed/lZAoFs75_cs",
                        "https://www.youtube.com/embed/uNf86_6n80w"
                    )));
            }
        };
    }
}
