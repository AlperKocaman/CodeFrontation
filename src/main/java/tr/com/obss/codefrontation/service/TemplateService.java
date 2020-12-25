package tr.com.obss.codefrontation.service;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.TemplateDTO;
import tr.com.obss.codefrontation.entity.Problem;
import tr.com.obss.codefrontation.entity.Role;
import tr.com.obss.codefrontation.entity.Template;
import tr.com.obss.codefrontation.entity.User;
import tr.com.obss.codefrontation.mapper.TemplateMapper;
import tr.com.obss.codefrontation.repository.TemplateRepository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;

@Service
@Slf4j
@RequiredArgsConstructor
public class TemplateService {
	
	@PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;
	
	private final TemplateMapper mapper;
	private final TemplateRepository templateRepository;

	public List<TemplateDTO> getAllTemplates() {
		List<Template> templateList = templateRepository.findAll();
		log.info("Template list retrieved: {}", templateList.toString());
		return mapper.toDTOList(templateList);
	}

	public List<TemplateDTO> deleteTemplates(List<TemplateDTO> templates) {
		templateRepository.deleteAll(mapper.toEntityList(templates));
		log.info("Template list deleted: {}", templates.toString());
		return templates;
	}

	public UUID deleteTemplate(UUID id) throws Exception {
		if (templateRepository.existsById(id)) {
			templateRepository.deleteById(id);
			log.info("Template deleted: {}", id.toString());

		} else {
			throw new Exception();
		}
		return id;
	}

	public TemplateDTO addTemplate(TemplateDTO templateDTO) {
		Template template = mapper.toTemplateEntity(templateDTO);
		template.setAuthor(entityManager.getReference(User.class,templateDTO.getAuthorId()));
		template.setRole(entityManager.getReference(Role.class,templateDTO.getRole().getId()));
		List<Problem> problemList = entityManager.createQuery("SELECT p FROM Problem p WHERE p.id IN :problemIds",Problem.class).setParameter("problemIds", templateDTO.getProblemIds()).getResultList();
		template.setTemplateProblems(new HashSet<Problem>(problemList));
		Template entity = templateRepository.save(template);
		log.info("Template created: {}", template.toString());
		return mapper.toTemplateDTO(entity);
	}
	

	public TemplateDTO updateTemplate(TemplateDTO templateDTO) throws Exception{
		Template origEntity = templateRepository.findById(templateDTO.getId()).orElseThrow(Exception::new);
		mapper.updateEntity(templateDTO, origEntity);
		templateRepository.save(origEntity);
		log.info("Template updated: {}", origEntity.toString());

		return templateDTO;
	}
}
