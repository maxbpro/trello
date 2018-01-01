package maxb.pro.trello.service.impl;

import maxb.pro.trello.model.Story;
import maxb.pro.trello.repository.StoryRepository;
import maxb.pro.trello.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Override
    public List<Story> getStories() {
        return storyRepository.findAll();
    }

    @Override
    public Story saveStory(Story story) {
        return storyRepository.save(story);
    }

    @Override
    public void deleteStory(Story story) {
        storyRepository.delete(story);
    }

    @Override
    public void deleteStory(Long id) {
        storyRepository.delete(id);
    }

    @Override
    public Story findStory(Long id) {
        return storyRepository.findOne(id);
    }
}
