package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.ProblemDTO;
import tr.com.obss.codefrontation.entity.Problem;
import tr.com.obss.codefrontation.entity.User;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.mapper.ProblemMapper;
import tr.com.obss.codefrontation.repository.ProblemRepository;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProblemService {
	private final ProblemMapper mapper;
	private final ProblemRepository problemRepository;

	public List<ProblemDTO> getAllProblems() {
		List<Problem> problemList = problemRepository.findAll();
		log.info("Problem list retrieved: {}", problemList.toString());
		return mapper.toDTOList(problemList);
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
