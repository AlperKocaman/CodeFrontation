package tr.com.obss.codefrontation.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class Role {
	
	 @Id
	 @GeneratedValue
	 private UUID id;
	 
	 private String name;

}
