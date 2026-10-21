package agentic_ai.controller;

import agentic_ai.digitaltwin.CareerDigitalTwin;
import agentic_ai.digitaltwin.CareerDigitalTwinService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/digital-twin")
public class CareerDigitalTwinController {

    private final CareerDigitalTwinService digitalTwinService;

    public CareerDigitalTwinController(
            CareerDigitalTwinService digitalTwinService) {

        this.digitalTwinService = digitalTwinService;
    }


    // =========================================================
    // GET DIGITAL TWIN
    // =========================================================

    @GetMapping("/{userId}")
    public ResponseEntity<CareerDigitalTwin> getTwin(
            @PathVariable Long userId) {

        CareerDigitalTwin twin =
                digitalTwinService.getTwin(userId);

        if (twin == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(twin);
    }


    // =========================================================
    // CREATE DIGITAL TWIN
    // =========================================================

    @PostMapping
    public ResponseEntity<CareerDigitalTwin> createTwin(
            @RequestBody CareerDigitalTwin twin) {

        CareerDigitalTwin savedTwin =
                digitalTwinService.createOrUpdateTwin(twin);

        return ResponseEntity.ok(savedTwin);
    }


    // =========================================================
    // UPDATE DIGITAL TWIN
    // =========================================================

    @PutMapping("/{userId}")
    public ResponseEntity<CareerDigitalTwin> updateTwin(
            @PathVariable Long userId,
            @RequestBody CareerDigitalTwin twin) {

        twin.setUserId(userId);

        CareerDigitalTwin updatedTwin =
                digitalTwinService.createOrUpdateTwin(twin);

        return ResponseEntity.ok(updatedTwin);
    }


    // =========================================================
    // DELETE DIGITAL TWIN
    // =========================================================

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteTwin(
            @PathVariable Long userId) {

        if (!digitalTwinService.exists(userId)) {
            return ResponseEntity.notFound().build();
        }

        digitalTwinService.deleteTwin(userId);

        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // SYNC DIGITAL TWIN WITH REAL STUDENT DATA
    // =========================================================

    @PostMapping("/sync/{userId}")
    public ResponseEntity<CareerDigitalTwin> syncTwin(
            @PathVariable Long userId,
            @RequestHeader(
                    value = "Authorization",
                    required = false
            ) String authorizationHeader) {

        String token = authorizationHeader;

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        CareerDigitalTwin twin =
                digitalTwinService.createTwinFromStudentData(
                        userId,
                        token
                );

        return ResponseEntity.ok(twin);
    }
}