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

import java.util.List;

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
                bookRepository.save(new Book(null, "Introduction to Algorithms", "Thomas H. Cormen", "Computer Science", 4.8, "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg"));
                bookRepository.save(new Book(null, "Clean Code: A Handbook", "Robert C. Martin", "Software Engineering", 4.9, "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg"));
                bookRepository.save(new Book(null, "Design Patterns", "Erich Gamma", "Computer Science", 4.6, "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg"));
                bookRepository.save(new Book(null, "Calculus: Early Transcendentals", "James Stewart", "Mathematics", 4.5, "https://covers.openlibrary.org/b/isbn/9781285057095-L.jpg"));
                bookRepository.save(new Book(null, "Organic Chemistry", "Paula Yurkanis", "Chemistry", 4.4, "https://covers.openlibrary.org/b/isbn/9780321768414-L.jpg"));
            }

            // Seed Courses
            if (courseRepository.count() == 0) {
                courseRepository.save(new Course(null, "Full Stack Web Development", "Tech Academy", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400", "48h 30m", 124, "Bestseller"));
                courseRepository.save(new Course(null, "Machine Learning A-Z", "Dr. Data", "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600&h=400", "60h 15m", 156, "New"));
                courseRepository.save(new Course(null, "Advanced React patterns", "UI Masters", "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600&h=400", "12h 45m", 42, null));
            }
        };
    }
}
