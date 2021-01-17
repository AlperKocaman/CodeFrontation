package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.ProblemDTO;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.dto.problem.ProblemEveluationDto;
import tr.com.obss.codefrontation.dto.problem.ProblemTestCaseDto;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.entity.Problem;
import tr.com.obss.codefrontation.entity.User;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.mapper.ProblemMapper;
import tr.com.obss.codefrontation.repository.AssignmentRepository;
import tr.com.obss.codefrontation.repository.ProblemRepository;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProblemService {
	private final ProblemMapper mapper;
	private final ProblemRepository problemRepository;
	private final AssignmentRepository assignmentRepository;
	private final UserService userService;
	private final Mapper userMapper;
	private final DmojProblemService dmojProblemService;

	public List<ProblemDTO> getAllProblems() {
		List<Problem> problemList = problemRepository.findAll();
		log.info("Problem list retrieved");
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
		log.info("Problem list deleted");
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
		createNewProblemForDMOJ(problemDTO);
		Problem entity = problemRepository.save(problem);
		log.info("Problem created: {}", problem.toString());

		return mapper.toProblemDTO(entity);
	}

	public ProblemDTO updateProblem(ProblemDTO problemDTO) throws Exception{
		Problem origEntity = problemRepository.findById(problemDTO.getId()).orElseThrow(Exception::new);
		mapper.updateEntity(problemDTO, origEntity);
		createNewProblemForDMOJ(problemDTO);
		problemRepository.save(origEntity);
		log.info("Problem updated: {}", origEntity.toString());

		return problemDTO;
	}

	private void createNewProblemForDMOJ(ProblemDTO problemDTO){
		ProblemEveluationDto problemEveluationDto = new ProblemEveluationDto();
		String inputs = problemDTO.getInputs();
		String outputs = problemDTO.getOutputs();
		String points = problemDTO.getPoint();

		List<ProblemTestCaseDto> problemTestCaseDtos = new ArrayList<>();
		ProblemTestCaseDto problemTestCaseDto = null;
		Scanner scannerInput = new Scanner(inputs);
		Scanner scannerOutput = new Scanner(outputs);
		Scanner scannerPoint = new Scanner(points);
		int lineIndex = 0;
		StringBuilder input = new StringBuilder();
		while (scannerInput.hasNextLine()) {
			String line = scannerInput.nextLine();
			if(line.startsWith("[INPUT")){
				if(lineIndex != 0){
					problemTestCaseDto.setInput(input.toString());
					input = new StringBuilder();
				}
				lineIndex ++ ;
				problemTestCaseDto = new ProblemTestCaseDto();
				problemTestCaseDtos.add(problemTestCaseDto);
				continue;
			}
			input.append(line + "\n");
		}
		if(problemTestCaseDto != null){
			problemTestCaseDto.setInput(input.toString());
		}
		scannerInput.close();

		lineIndex = 0;
		StringBuilder output = new StringBuilder();
		while (scannerOutput.hasNextLine()) {
			String line = scannerOutput.nextLine();
			if(line.startsWith("[OUTPUT")){
				if(lineIndex != 0){
					problemTestCaseDto.setOutput(output.toString());
					output = new StringBuilder();
				}
				lineIndex ++ ;
				problemTestCaseDto = problemTestCaseDtos.get(lineIndex-1);
				continue;
			}
			output.append(line + "\n");
		}
		if(problemTestCaseDto != null){
			problemTestCaseDto.setOutput(output.toString());
		}
		scannerOutput.close();

		lineIndex = 0;
		StringBuilder pointStrBuilder = new StringBuilder();
		while (scannerPoint.hasNextLine()) {
			String line = scannerPoint.nextLine();
			if(line.startsWith("[POINT")){
				if(lineIndex != 0){
					problemTestCaseDto.setPoint(Double.valueOf(pointStrBuilder.toString()));
					pointStrBuilder= new StringBuilder();
				}
				lineIndex ++ ;
				problemTestCaseDto = problemTestCaseDtos.get(lineIndex-1);
				continue;
			}
			pointStrBuilder.append(line + "\n");
		}
		if(problemTestCaseDto != null){
			problemTestCaseDto.setPoint(Double.valueOf(pointStrBuilder.toString()));
		}
		scannerPoint.close();

		problemEveluationDto.setName(problemDTO.getName());
		problemEveluationDto.setTestCases(problemTestCaseDtos);
		dmojProblemService.createNewProblem(problemEveluationDto);
	}


	public ProblemDTO getProblemsDetailsByProblemCode(String problemCode) {
		Optional<Problem> problem = problemRepository.findByCode(problemCode);
		if(problem.isPresent()){
			log.info("Problem retrieved: {}", problem.get().getName());
			return mapper.toProblemDTO(problem.get());
		}
		return null;
	}
}
