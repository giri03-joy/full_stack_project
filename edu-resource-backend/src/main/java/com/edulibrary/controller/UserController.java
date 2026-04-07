package com.edulibrary.controller;

import com.edulibrary.model.Book;
import com.edulibrary.model.User;
import com.edulibrary.model.Course;
import com.edulibrary.model.UserCourse;
import com.edulibrary.repository.BookRepository;
import com.edulibrary.repository.UserRepository;
import com.edulibrary.repository.CourseRepository;
import com.edulibrary.repository.UserCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserCourseRepository userCourseRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@jakarta.validation.Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @jakarta.validation.Valid @RequestBody User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setRole(userDetails.getRole());
            user.setStatus(userDetails.getStatus());
            return ResponseEntity.ok(userRepository.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- Saved Books logic ---
    @GetMapping("/{userId}/saved-books")
    public ResponseEntity<?> getSavedBooks(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get().getSavedBooks());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{userId}/saved-books/{bookId}")
    public ResponseEntity<?> toggleSavedBook(@PathVariable Long userId, @PathVariable Long bookId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (userOpt.isPresent() && bookOpt.isPresent()) {
            User user = userOpt.get();
            Book book = bookOpt.get();
            
            if (user.getSavedBooks().contains(book)) {
                user.getSavedBooks().remove(book);
            } else {
                user.getSavedBooks().add(book);
            }
            userRepository.save(user);
            return ResponseEntity.ok(user.getSavedBooks());
        }
        return ResponseEntity.notFound().build();
    }

    // --- Enrolled Courses logic ---
    @GetMapping("/{userId}/courses")
    public ResponseEntity<?> getEnrolledCourses(@PathVariable Long userId) {
        List<UserCourse> enrolled = userCourseRepository.findByUserId(userId);
        return ResponseEntity.ok(enrolled);
    }

    @PostMapping("/{userId}/courses/{courseId}")
    public ResponseEntity<?> enrollCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (userOpt.isPresent() && courseOpt.isPresent()) {
            Optional<UserCourse> existing = userCourseRepository.findByUserIdAndCourseId(userId, courseId);
            if (existing.isEmpty()) {
                UserCourse userCourse = new UserCourse();
                userCourse.setUser(userOpt.get());
                userCourse.setCourse(courseOpt.get());
                userCourse.setProgress(0);
                userCourseRepository.save(userCourse);
                return ResponseEntity.ok(userCourse);
            }
            return ResponseEntity.badRequest().body("Already enrolled");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}/courses/{courseId}/progress")
    public ResponseEntity<?> updateCourseProgress(@PathVariable Long userId, 
                                                  @PathVariable Long courseId,
                                                  @RequestBody Map<String, Integer> payload) {
        Optional<UserCourse> existing = userCourseRepository.findByUserIdAndCourseId(userId, courseId);
        if (existing.isPresent()) {
            UserCourse userCourse = existing.get();
            userCourse.setProgress(payload.get("progress"));
            userCourseRepository.save(userCourse);
            return ResponseEntity.ok(userCourse);
        }
        return ResponseEntity.notFound().build();
    }
}
