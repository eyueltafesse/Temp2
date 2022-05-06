package com.infy.associateApp.trainingCert.domain;

import lombok.*;

import javax.persistence.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class TrainingAndCertification {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private long id;

	private String status;

	private int empId;

	@OneToOne
	@JoinColumn(name = "training_and_certification_catalog_id")
	private TrainingAndCertificationCatalog certification;
}