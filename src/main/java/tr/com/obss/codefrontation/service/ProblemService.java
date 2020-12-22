package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.ProblemDTO;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.entity.Problem;
import tr.com.obss.codefrontation.entity.User;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.mapper.ProblemMapper;
import tr.com.obss.codefrontation.repository.AssignmentRepository;
import tr.com.obss.codefrontation.repository.ProblemRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProblemService {
	private final ProblemMapper mapper;
	private final ProblemRepository problemRepository;
	private final AssignmentRepository assignmentRepository;
	private final UserService userService;
	private final Mapper userMapper;

	public List<ProblemDTO> getAllProblems() {
		List<Problem> problemList = problemRepository.findAll();
		log.info("Problem list retrieved: {}", problemList.toString());
		return mapper.toDTOList(problemList);
	}

	public List<ProblemDTO> getAllProblemsAssignedToUserByUsername(String username) {
		UserDTO userDTO = null;
		try {
			userDTO = userService.getUserByUsername(username);
		} catch (Exception e) {
			log.error("No user was found by username: " + username);
		}
		List<Assignment> userAssignments = assignmentRepository.findByUser(userMapper.toUserEntity(userDTO));
		List<Problem> problemsAssignedToUser = null;
		if(userAssignments != null && !userAssignments.isEmpty()){
			problemsAssignedToUser = new ArrayList<>();

			for(Assignment assignment:userAssignments){
				problemsAssignedToUser.add(assignment.getProblem());
			}

			log.info("Assigned problems to user {} were retrieved: {}", username, problemsAssignedToUser.toString());
			return mapper.toDTOList(problemsAssignedToUser);
		} else{
			log.info("Assigned problems to user {} are null or empty", username);
			return null;
		}
	}

	public List<ProblemDTO> deleteProblems(List<ProblemDTO> problems) {
		problemRepository.deleteAll(mapper.toEntityList(problems));
		log.info("Problem list deleted: {}", problems.toString());
		return problems;
	}

	public UUID deleteProblem(UUID id) throws Exception {
		if (problemRepository.existsById(id)) {
			problemRepository.deleteById(id);
			log.info("Problem deleted: {}", id.toString());

		} else {
			throw new Exception();
		}
		return id;
	}

	public ProblemDTO addProblem(ProblemDTO problemDTO) {
		Problem problem = mapper.toProblemEntity(problemDTO);
		Problem entity = problemRepository.save(problem);
		log.info("Problem created: {}", problem.toString());

		return mapper.toProblemDTO(entity);
	}

	public ProblemDTO updateProblem(ProblemDTO problemDTO) throws Exception{
		Problem origEntity = problemRepository.findById(problemDTO.getId()).orElseThrow(Exception::new);
		mapper.updateEntity(problemDTO, origEntity);
		problemRepository.save(origEntity);
		log.info("Problem updated: {}", origEntity.toString());

		return problemDTO;
	}


}
