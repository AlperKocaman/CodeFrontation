package tr.com.obss.codefrontation.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

//I am the base
@Data
@MappedSuperclass
public class BaseEntity implements Serializable {

    @Temporal( TemporalType.TIMESTAMP )
    @CreationTimestamp
    @Column(name = "created_date")
    private Date createdDate;

    @Temporal( TemporalType.TIMESTAMP )
    @UpdateTimestamp
    @Column(name = "updated_date")
    private Date updatedDate;
}
