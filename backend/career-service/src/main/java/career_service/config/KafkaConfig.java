package career_service.config;

import career_service.event.AssessmentCompletedEvent;
import career_service.event.SkillUpdatedEvent;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConfig {

    private Map<String, Object> consumerConfig(String groupId) {

        Map<String, Object> config = new HashMap<>();

        config.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "localhost:9092"
        );

        config.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                groupId
        );

        config.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        config.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class
        );

        config.put(
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                JsonDeserializer.class
        );

        return config;
    }

    @Bean
    public ConsumerFactory<String, SkillUpdatedEvent>
    skillConsumerFactory() {

        JsonDeserializer<SkillUpdatedEvent> deserializer =
                new JsonDeserializer<>(SkillUpdatedEvent.class);

        deserializer.addTrustedPackages("*");
        deserializer.setUseTypeHeaders(false);

        return new DefaultKafkaConsumerFactory<>(
                consumerConfig("skillbridge-career-group"),
                new StringDeserializer(),
                deserializer
        );
    }

    @Bean(name = "kafkaListenerContainerFactory")
    public ConcurrentKafkaListenerContainerFactory<String, SkillUpdatedEvent>
    skillKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, SkillUpdatedEvent>
                factory = new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(skillConsumerFactory());

        return factory;
    }

    @Bean
    public ConsumerFactory<String, AssessmentCompletedEvent>
    assessmentConsumerFactory() {

        JsonDeserializer<AssessmentCompletedEvent> deserializer =
                new JsonDeserializer<>(AssessmentCompletedEvent.class);

        deserializer.addTrustedPackages("*");
        deserializer.setUseTypeHeaders(false);

        return new DefaultKafkaConsumerFactory<>(
                consumerConfig("skillbridge-career-assessment-group"),
                new StringDeserializer(),
                deserializer
        );
    }

    @Bean(name = "assessmentKafkaListenerContainerFactory")
    public ConcurrentKafkaListenerContainerFactory<String, AssessmentCompletedEvent>
    assessmentKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, AssessmentCompletedEvent>
                factory = new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(assessmentConsumerFactory());

        return factory;
    }
}