package notification_service.service;

import notification_service.entity.Notification;
import notification_service.repository.NotificationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Notification not found with id: " + id));
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification updateNotification(Long id, Notification updatedNotification) {

        Notification existingNotification = getNotificationById(id);

        existingNotification.setUserId(updatedNotification.getUserId());
        existingNotification.setMessage(updatedNotification.getMessage());
        existingNotification.setType(updatedNotification.getType());
        existingNotification.setReadStatus(updatedNotification.getReadStatus());
        existingNotification.setCreatedAt(updatedNotification.getCreatedAt());

        return notificationRepository.save(existingNotification);
    }

    public void deleteNotification(Long id) {
        Notification notification = getNotificationById(id);
        notificationRepository.delete(notification);
    }
}