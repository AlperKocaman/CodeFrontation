package tr.com.obss.codefrontation.entity;

import tr.com.obss.codefrontation.enums.Category;
import tr.com.obss.codefrontation.enums.Level;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "problems")
public class Problems {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String code;
    private String creators;
    private Category category;
    private Level difficultyLevel;
    private String bestCode;
    private int point;
    private double timeLimit;
    private double memoryLimit;
    private String allowedLanguages;
    private Date createdDate;
    private Date updatedDate;
}
