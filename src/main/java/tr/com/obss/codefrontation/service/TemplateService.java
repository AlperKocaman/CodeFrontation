package tr.com.obss.codefrontation.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.TemplateDTO;
import tr.com.obss.codefrontation.entity.Template;
import tr.com.obss.codefrontation.mapper.TemplateMapper;
import tr.com.obss.codefrontation.repository.TemplateRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class TemplateService {
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
