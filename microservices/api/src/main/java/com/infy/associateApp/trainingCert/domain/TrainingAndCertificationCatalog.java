package com.infy.associateApp.trainingCert.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@JsonIgnoreProperties
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class TrainingAndCertificationCatalog {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private long id;

	@Column(length = 50)
	private String type;

	@Column(length = 50)
	private String filterType;

	@Column(length = 100)
	private String name;

	@Column(length = 5)
	private String duration;

	@Column
	private String link;

//	public static TrainingAndCertificationCatalog getById(long id) {
//	}

//	@ManyToOne()
//	@JoinColumn(name = "trainingId")
//	private TrainingAndCertification trainingAndCertification;

	@Override
	public String toString() {
		return "TrainingAndCertificationCatalog{" +
				//"id=" + catId +
				", type='" + type + '\'' +
				", filterType='" + filterType + '\'' +
				", name='" + name + '\'' +
				", duration='" + duration + '\'' +
				", link='" + link + '\'' +
				'}';
	}
}