package tr.com.obss.codefrontation.mapper;

import org.mapstruct.MappingTarget;
import tr.com.obss.codefrontation.dto.AssignmentDTO;
import tr.com.obss.codefrontation.entity.Assignment;

import java.util.List;

@org.mapstruct.Mapper(componentModel = "spring")
public interface AssignmentMapper {

	AssignmentDTO toAssignmentDTO(Assignment assignment);

	Assignment toAssignmentEntity(AssignmentDTO dto);

	void updateEntity(AssignmentDTO dto, @MappingTarget Assignment entity);

	List<AssignmentDTO> toDTOList(List<Assignment> entity);
}
