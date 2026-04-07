package com.edulibrary.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Instructor is required")
    @Column(nullable = false)
    private String instructor;

    private String thumbnail;

    private String duration;

    private Integer lessons;

    private String tag;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "course_videos", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "video_url")
    private java.util.List<String> videoUrls;
}
