package maxb.pro.trello.service;

import maxb.pro.trello.model.Story;

import java.util.List;

public interface StoryService {

    List<Story> getStories();

    Story saveStory(Story story);

    void deleteStory(Story story);

    void deleteStory(Long id);

    Story findStory(Long id);
}
