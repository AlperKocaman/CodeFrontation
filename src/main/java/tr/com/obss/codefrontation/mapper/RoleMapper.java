package tr.com.obss.codefrontation.mapper;

import java.util.List;

import tr.com.obss.codefrontation.dto.RoleDTO;
import tr.com.obss.codefrontation.entity.Role;

@org.mapstruct.Mapper(componentModel = "spring")
public interface RoleMapper {
	RoleDTO toRoleDTO(Role source);
	List<RoleDTO> toDTOList(List<Role> sourceList);
}
