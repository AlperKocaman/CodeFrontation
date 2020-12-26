package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.AssignmentDTO;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.mapper.AssignmentMapper;
import tr.com.obss.codefrontation.repository.AssignmentRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class AssignmentService {

	private final AssignmentMapper mapper;
	private final AssignmentRepository assignmentRepository;

	public AssignmentDTO addAssignment(AssignmentDTO assignmentDTO) {
		Assignment assignment = mapper.toAssignmentEntity(assignmentDTO);
		Assignment entity = assignmentRepository.save(assignment);
		log.info("Assigment created");

		return mapper.toAssignmentDTO(entity);
	}
	
	public AssignmentDTO getAssignment(String problemCode,String username) {
		Optional<Assignment> assignment = assignmentRepository.getAssignmentByUsernameAndProblemCode(username, problemCode);
		if(assignment.isPresent()) {
			return mapper.toAssignmentDTO(assignment.get());
		}
		throw new RuntimeException("Assignment does not exist!!!");
	}
}
