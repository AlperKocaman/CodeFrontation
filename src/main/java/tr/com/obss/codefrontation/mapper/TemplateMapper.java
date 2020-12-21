package tr.com.obss.codefrontation.mapper;

import java.util.List;

import org.mapstruct.MappingTarget;

import tr.com.obss.codefrontation.dto.TemplateDTO;
import tr.com.obss.codefrontation.entity.Template;

@org.mapstruct.Mapper(componentModel = "spring")
public interface TemplateMapper {
	TemplateDTO toTemplateDTO(Template template);
	Template toTemplateEntity(TemplateDTO dto);
	void updateEntity(TemplateDTO dto, @MappingTarget Template entity);
	List<TemplateDTO> toDTOList(List<Template> entity);
	List<Template> toEntityList(List<TemplateDTO> entity);
}
