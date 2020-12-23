package tr.com.obss.codefrontation.mapper;

import java.util.List;

import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import tr.com.obss.codefrontation.dto.RoleDTO;
import tr.com.obss.codefrontation.dto.TemplateDTO;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.entity.Role;
import tr.com.obss.codefrontation.entity.Template;
import tr.com.obss.codefrontation.entity.User;

@org.mapstruct.Mapper(componentModel = "spring")
public interface TemplateMapper {
	@Mapping(target = "authorId", source = "author.id")
	@Mapping(target = "authorName", source = "author.username")
	TemplateDTO toTemplateDTO(Template template);
	@Mapping(source = "authorId", target = "author.id")
	@Mapping(source = "authorName", target = "author.username")
	Template toTemplateEntity(TemplateDTO dto);
	Role toRoleEntity(RoleDTO source);
	RoleDTO toRoleDTO(Role source);
	UserDTO toUserDTO(User source);
	@Mapping(source = "authorId", target = "author.id")
	@Mapping(source = "authorName", target = "author.username")
	void updateEntity(TemplateDTO dto, @MappingTarget Template entity);
	List<TemplateDTO> toDTOList(List<Template> entity);
	List<Template> toEntityList(List<TemplateDTO> entity);
}
