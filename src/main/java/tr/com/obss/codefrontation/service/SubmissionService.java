package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.SubmissionDTO;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.SubmissionRepository;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubmissionService {
    private final Mapper mapper;
    private final SubmissionRepository repository;

    public List<SubmissionDTO> getAllSubmissions() {
        List<Submission> submissionList = repository.findAll();
        log.info("Submission list retrieved: {}", submissionList.toString());
        return mapper.toSubmissionDTOList(submissionList);
    }
}
