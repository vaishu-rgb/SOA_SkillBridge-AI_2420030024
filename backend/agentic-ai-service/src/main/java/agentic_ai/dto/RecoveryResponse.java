package agentic_ai.dto;

import java.util.List;

public class RecoveryResponse {

    private String problemIdentified;

    private String recoveryAction;

    private String alternativeAction;

    private List<String> modifiedPlan;

    private String motivationMessage;

    public String getProblemIdentified() {
        return problemIdentified;
    }

    public void setProblemIdentified(String problemIdentified) {
        this.problemIdentified = problemIdentified;
    }

    public String getRecoveryAction() {
        return recoveryAction;
    }

    public void setRecoveryAction(String recoveryAction) {
        this.recoveryAction = recoveryAction;
    }

    public String getAlternativeAction() {
        return alternativeAction;
    }

    public void setAlternativeAction(String alternativeAction) {
        this.alternativeAction = alternativeAction;
    }

    public List<String> getModifiedPlan() {
        return modifiedPlan;
    }

    public void setModifiedPlan(List<String> modifiedPlan) {
        this.modifiedPlan = modifiedPlan;
    }

    public String getMotivationMessage() {
        return motivationMessage;
    }

    public void setMotivationMessage(String motivationMessage) {
        this.motivationMessage = motivationMessage;
    }
}