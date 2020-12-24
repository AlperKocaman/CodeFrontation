package tr.com.obss.codefrontation.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.obss.codefrontation.entity.Template;

@Repository
public interface TemplateRepository extends JpaRepository<Template,UUID> {

}
