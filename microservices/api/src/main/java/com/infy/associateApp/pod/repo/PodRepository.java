package com.infy.associateApp.pod.repo;

import com.infy.associateApp.pod.model.Pod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PodRepository extends JpaRepository<Pod,Integer> {

    boolean existsByPodId(int podId);

    Pod getByPodId(int podId);

    boolean existsByPodName(String podName);

    Pod getByPodName(String name);

    Pod findByPodName(String name);

    List<Pod> findByPodNameStartsWith(String name);

    List<Pod> findByPodAnchor(int podAnchor);
}
