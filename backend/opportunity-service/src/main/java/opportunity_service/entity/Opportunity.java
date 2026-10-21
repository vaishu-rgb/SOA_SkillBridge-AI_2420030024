package opportunity_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "opportunities")
public class Opportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String type;

    @Column(columnDefinition = "TEXT")
    private String requiredSkills;

    private Integer minimumReadinessScore;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Opportunity() {
    }

    public Opportunity(Long id, String title, String company, String type,
                       String requiredSkills, Integer minimumReadinessScore,
                       String location, String description) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.type = type;
        this.requiredSkills = requiredSkills;
        this.minimumReadinessScore = minimumReadinessScore;
        this.location = location;
        this.description = description;
    }

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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public Integer getMinimumReadinessScore() {
        return minimumReadinessScore;
    }

    public void setMinimumReadinessScore(Integer minimumReadinessScore) {
        this.minimumReadinessScore = minimumReadinessScore;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}