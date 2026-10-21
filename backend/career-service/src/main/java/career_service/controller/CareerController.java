package career_service.controller;

import career_service.entity.Career;
import career_service.service.CareerService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/careers")
public class CareerController {

    private final CareerService careerService;

    public CareerController(CareerService careerService) {
        this.careerService = careerService;
    }

    // Create a new career
    @PostMapping
    public ResponseEntity<Career> createCareer(@RequestBody Career career) {
        Career createdCareer = careerService.createCareer(career);
        return new ResponseEntity<>(createdCareer, HttpStatus.CREATED);
    }

    // Get all careers
    @GetMapping
    public ResponseEntity<List<Career>> getAllCareers() {
        List<Career> careers = careerService.getAllCareers();
        return ResponseEntity.ok(careers);
    }

    // Get career by ID
    @GetMapping("/{id}")
    public ResponseEntity<Career> getCareerById(@PathVariable Long id) {
        Career career = careerService.getCareerById(id);
        return ResponseEntity.ok(career);
    }
}
