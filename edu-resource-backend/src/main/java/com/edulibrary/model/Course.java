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

    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getInstructor() {
		return instructor;
	}

	public void setInstructor(String instructor) {
		this.instructor = instructor;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Integer getLessons() {
		return lessons;
	}

	public void setLessons(Integer lessons) {
		this.lessons = lessons;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public java.util.List<String> getVideoUrls() {
		return videoUrls;
	}

	public void setVideoUrls(java.util.List<String> videoUrls) {
		this.videoUrls = videoUrls;
	}

	private String duration;

    private Integer lessons;

    private String tag;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "course_videos", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "video_url")
    private java.util.List<String> videoUrls;
}
