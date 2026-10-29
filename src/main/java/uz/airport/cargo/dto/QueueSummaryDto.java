package uz.airport.cargo.dto;

import java.util.Map;

public class QueueSummaryDto {
    private long totalToday;
    private long waitingCount;
    private long preparingCount;
    private long calledCount;
    private long atDockCount;
    private long completedToday;
    private long kppExitedToday;
    private double avgWaitMinutes;
    private double avgIssueMinutes;
    private Map<String, Long> statusCounts;

    public QueueSummaryDto() {}

    // Getters and Setters
    public long getTotalToday() { return totalToday; }
    public void setTotalToday(long totalToday) { this.totalToday = totalToday; }

    public long getWaitingCount() { return waitingCount; }
    public void setWaitingCount(long waitingCount) { this.waitingCount = waitingCount; }

    public long getPreparingCount() { return preparingCount; }
    public void setPreparingCount(long preparingCount) { this.preparingCount = preparingCount; }

    public long getCalledCount() { return calledCount; }
    public void setCalledCount(long calledCount) { this.calledCount = calledCount; }

    public long getAtDockCount() { return atDockCount; }
    public void setAtDockCount(long atDockCount) { this.atDockCount = atDockCount; }

    public long getCompletedToday() { return completedToday; }
    public void setCompletedToday(long completedToday) { this.completedToday = completedToday; }

    public long getKppExitedToday() { return kppExitedToday; }
    public void setKppExitedToday(long kppExitedToday) { this.kppExitedToday = kppExitedToday; }

    public double getAvgWaitMinutes() { return avgWaitMinutes; }
    public void setAvgWaitMinutes(double avgWaitMinutes) { this.avgWaitMinutes = avgWaitMinutes; }

    public double getAvgIssueMinutes() { return avgIssueMinutes; }
    public void setAvgIssueMinutes(double avgIssueMinutes) { this.avgIssueMinutes = avgIssueMinutes; }

    public Map<String, Long> getStatusCounts() { return statusCounts; }
    public void setStatusCounts(Map<String, Long> statusCounts) { this.statusCounts = statusCounts; }
}
