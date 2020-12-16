package tr.com.obss.codefrontation.mapper;

import org.mapstruct.MappingTarget;
import tr.com.obss.codefrontation.dto.ProblemDTO;
import tr.com.obss.codefrontation.entity.Problem;

import java.util.List;

@org.mapstruct.Mapper(componentModel = "spring")
public interface ProblemMapper {
	ProblemDTO toProblemDTO(Problem problem);
	Problem toProblemEntity(ProblemDTO dto);
	void updateEntity(ProblemDTO dto, @MappingTarget Problem entity);
	List<ProblemDTO> toDTOList(List<Problem> entity);
	List<Problem> toEntityList(List<ProblemDTO> entity);

}
