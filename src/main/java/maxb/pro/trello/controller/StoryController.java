package maxb.pro.trello.controller;

import maxb.pro.trello.model.Story;
import maxb.pro.trello.repository.StoryRepository;
import maxb.pro.trello.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/stories")
public class StoryController {


    @Autowired
    private StoryService storyService;

    @Autowired
    private StoryRepository storyRepository;


//    @PostConstruct
//    private void initPosts(){
//
//        storyRepository.deleteAll();
//
//        for(int i = 0; i < 10; i++){
//            Story story = new Story();
//            story.setTitle("story" + i);
//            story.setDescription("bla bla bla");
//            story.setAssignee(new Long(1));
//            story.setReporter(new Long(1));
//            story.setCriteria("some criteria");
//            story.setType("Bug");
//            story.setStatus("To Do");
//            storyRepository.save(story);
//        }
//
//    }


    @RequestMapping(method = RequestMethod.GET)
    public List<Story> allStories() {
        return storyService.getStories();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Story getStoryById(@PathVariable Long id) {
        return storyService.findStory(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Story createStory(@Valid @RequestBody Story story) {
        return storyService.saveStory(story);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Story> updateStory(@PathVariable Long id,
                                                @RequestBody Story story) {

        Story oldStory = storyService.findStory(id);
        if (oldStory == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldStory.setTitle (story.getTitle());
        oldStory.setDescription(story.getDescription());
        oldStory.setCriteria(story.getCriteria());
        oldStory.setStatus(story.getStatus());
        oldStory.setType(story.getType());
        oldStory.setReporter(story.getReporter());
        oldStory.setAssignee(story.getAssignee());
        Story updatedStory = storyService.saveStory(oldStory);
        return new ResponseEntity<>(updatedStory, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteStory(@PathVariable("id") Long id) {
        storyService.deleteStory(id);
        return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
    }
}
