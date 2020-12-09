package tr.com.obss.codefrontation.mapper;

import org.mapstruct.MappingTarget;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.entity.User;

import java.util.List;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {
	UserDTO toUserDTO(User user);
	User toUserEntity(UserDTO dto);
	void updateEntity(UserDTO dto, @MappingTarget User entity);
	List<UserDTO> toDTOList(List<User> entity);


}