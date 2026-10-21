package agentic_ai.config;

import agentic_ai.event.AssessmentCompletedEvent;
import agentic_ai.event.SkillUpdatedEvent;

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

    // =========================================================
    // ASSESSMENT COMPLETED CONSUMER
    // =========================================================

    @Bean
    public ConsumerFactory<String, AssessmentCompletedEvent>
    consumerFactory() {

        Map<String, Object> props = new HashMap<>();

        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "localhost:9092"
        );

        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "skillbridge-agentic-ai-group"
        );

        props.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "latest"
        );

        props.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class
        );

        JsonDeserializer<AssessmentCompletedEvent> deserializer =
                new JsonDeserializer<>(AssessmentCompletedEvent.class);

        deserializer.setUseTypeHeaders(false);

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean(name = "kafkaListenerContainerFactory")
    public ConcurrentKafkaListenerContainerFactory<String, AssessmentCompletedEvent>
    kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, AssessmentCompletedEvent>
                factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(consumerFactory());

        return factory;
    }


    // =========================================================
    // SKILL UPDATED CONSUMER
    // =========================================================

    @Bean
    public ConsumerFactory<String, SkillUpdatedEvent>
    skillUpdatedConsumerFactory() {

        Map<String, Object> props = new HashMap<>();

        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "localhost:9092"
        );

        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "skillbridge-digital-twin-group"
        );

        props.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "latest"
        );

        props.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class
        );

        JsonDeserializer<SkillUpdatedEvent> deserializer =
                new JsonDeserializer<>(SkillUpdatedEvent.class);

        /*
         * Ignore the package information written by
         * Skill Service and deserialize directly into
         * agentic_ai.event.SkillUpdatedEvent.
         */
        deserializer.setUseTypeHeaders(false);

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean(name = "skillUpdatedKafkaListenerContainerFactory")
    public ConcurrentKafkaListenerContainerFactory<String, SkillUpdatedEvent>
    skillUpdatedKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, SkillUpdatedEvent>
                factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                skillUpdatedConsumerFactory()
        );

        return factory;
    }
}