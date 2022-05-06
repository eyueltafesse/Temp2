package com.infy.associateApp.pod.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.infy.associateApp.employee.model.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

// creates pod table in db: David
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pod implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private int podId;

    @NotEmpty(message = "Pod name is required")
    @NotNull(message = "Pod name is required")
    @Size(min = 2, max = 50, message = "Pod Name must between 2 and 50 characters")
    @Column(unique = true)
    private String podName;

    // Anchor name is taken from anchor after id is verified
    @Nullable
    private String anchorName;

    @NotNull
    private int podAnchor;

    @Nullable
    @Size(max=50, message = "Client cannot be more than 50 characters")
    private String client;

    @Nullable
    @Size(max = 50, message = "Account Anchor cannot be more than 50 characters")
    private String accountAnchor;

    @Nullable
    @Size(max = 500, message = "Technology cannot be more than 500 characters")
    private String tech;

    @Nullable
    @Size(max = 50, message = "Location cannot be more than 50 characters")
    private String location;
    private String status;

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private LocalDate joinDate;

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private LocalDate endDate;

    // Relationship between employee and pod: David
    @JsonIgnoreProperties("pods")
    @ManyToMany(mappedBy = "pods", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Employee> podEmployees = new HashSet<>();

    public void addPodEmployees(Employee emp) {
        podEmployees.add(emp);
    }
}
