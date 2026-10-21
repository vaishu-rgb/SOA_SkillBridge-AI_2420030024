package agentic_ai.controller;

import agentic_ai.dto.GapAnalysisRequest;
import agentic_ai.service.GapAnalysisAgent;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class GapAnalysisController {

    private final GapAnalysisAgent gapAnalysisAgent;

    public GapAnalysisController(GapAnalysisAgent gapAnalysisAgent) {
        this.gapAnalysisAgent = gapAnalysisAgent;
    }

    @PostMapping("/gap-analysis")
    public String analyzeGaps(@RequestBody GapAnalysisRequest request) {

        return gapAnalysisAgent.analyzeGaps(request);
    }
}