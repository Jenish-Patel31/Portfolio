const express = require('express');
const Hero = require('../models/Hero');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Achievement = require('../models/Achievement');
const Leadership = require('../models/Leadership');
const { auth, adminOnly } = require('../middleware/auth');
const { validate, portfolioSchemas } = require('../middleware/validation');

const router = express.Router();

// ==================== HERO SECTION ====================

// @route   GET /api/portfolio/hero
// @desc    Get hero section data
// @access  Public
router.get('/hero', async (req, res) => {
  try {
    const hero = await Hero.findOne({ isActive: true });
    
    if (!hero) {
      return res.status(404).json({
        status: 'error',
        message: 'Hero section not found'
      });
    }

    res.json({
      status: 'success',
      data: hero
    });
  } catch (error) {
    console.error('Hero fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/hero
// @desc    Update hero section
// @access  Private (Admin only)
router.put('/hero', auth, adminOnly, validate(portfolioSchemas.hero), async (req, res) => {
  try {
    let hero = await Hero.findOne({ isActive: true });
    
    if (hero) {
      // Update existing hero
      Object.assign(hero, req.body);
      await hero.save();
    } else {
      // Create new hero
      hero = new Hero({ ...req.body, isActive: true });
      await hero.save();
    }

    res.json({
      status: 'success',
      message: 'Hero section updated successfully',
      data: hero
    });
  } catch (error) {
    console.error('Hero update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ==================== PROJECTS SECTION ====================

// @route   GET /api/portfolio/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let filter = { isActive: true };
    
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';
    
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.json({
      status: 'success',
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/portfolio/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, isActive: true });
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.json({
      status: 'success',
      data: project
    });
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/portfolio/projects
// @desc    Create new project
// @access  Private (Admin only)
router.post('/projects', auth, adminOnly, validate(portfolioSchemas.project), async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/projects/:id
// @desc    Update project
// @access  Private (Admin only)
router.put('/projects/:id', auth, adminOnly, validate(portfolioSchemas.project), async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/portfolio/projects/:id
// @desc    Delete project
// @access  Private (Admin only)
router.delete('/projects/:id', auth, adminOnly, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ==================== EXPERIENCE SECTION ====================

// @route   GET /api/portfolio/experience
// @desc    Get all experience entries
// @access  Public
router.get('/experience', async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true }).sort({ order: 1, startDate: -1 });
    
    res.json({
      status: 'success',
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    console.error('Experience fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/portfolio/experience
// @desc    Create new experience entry
// @access  Private (Admin only)
router.post('/experience', auth, adminOnly, validate(portfolioSchemas.experience), async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();

    res.status(201).json({
      status: 'success',
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error) {
    console.error('Experience creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/experience/:id
// @desc    Update experience entry
// @access  Private (Admin only)
router.put('/experience/:id', auth, adminOnly, validate(portfolioSchemas.experience), async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    console.error('Experience update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/portfolio/experience/:id
// @desc    Delete experience entry
// @access  Private (Admin only)
router.delete('/experience/:id', auth, adminOnly, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Experience deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ==================== SKILLS SECTION ====================

// @route   GET /api/portfolio/skills
// @desc    Get all skills
// @access  Public
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true }).sort({ order: 1 });
    
    res.json({
      status: 'success',
      count: skills.length,
      data: skills
    });
  } catch (error) {
    console.error('Skills fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/portfolio/skills
// @desc    Create new skill
// @access  Private (Admin only)
router.post('/skills', auth, adminOnly, validate(portfolioSchemas.skill), async (req, res) => {
  try {
    console.log('Received skill data:', req.body);
    const { category, skills } = req.body;
    
    // Find or create the category
    let skillCategory = await Skill.findOne({ category });
    
    if (!skillCategory) {
      // Create new category with the skill
      skillCategory = new Skill({ category, skills });
    } else {
      // Add skill to existing category
      skillCategory.skills.push(...skills);
    }
    
    await skillCategory.save();

    const updatedSkills = await Skill.find({ isActive: true }).sort({ order: 1 });

    res.status(201).json({
      status: 'success',
      message: 'Skill created successfully',
      data: updatedSkills
    });
  } catch (error) {
    console.error('Skill creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/skills/:categoryId/skills/:skillId
// @desc    Update individual skill
// @access  Private (Admin only)
router.put('/skills/:categoryId/skills/:skillId', auth, adminOnly, async (req, res) => {
  try {
    const { categoryId, skillId } = req.params;
    const updateData = req.body;
    
    // Validate the update data
    if (updateData.proficiency !== undefined && (updateData.proficiency < 0 || updateData.proficiency > 100)) {
      return res.status(400).json({
        status: 'error',
        message: 'Proficiency must be between 0 and 100'
      });
    }
    
    if (updateData.yearsOfExperience !== undefined && updateData.yearsOfExperience < 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Years of experience cannot be negative'
      });
    }
    
    const skillCategory = await Skill.findById(categoryId);
    if (!skillCategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Skill category not found'
      });
    }
    
    const skillIndex = skillCategory.skills.findIndex(skill => skill._id.toString() === skillId);
    if (skillIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Skill not found'
      });
    }
    
    // Update the skill
    skillCategory.skills[skillIndex] = { ...skillCategory.skills[skillIndex], ...updateData };
    await skillCategory.save();

    const updatedSkills = await Skill.find({ isActive: true }).sort({ order: 1 });

    res.json({
      status: 'success',
      message: 'Skill updated successfully',
      data: updatedSkills
    });
  } catch (error) {
    console.error('Skill update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/portfolio/skills/:categoryId/skills/:skillId
// @desc    Delete individual skill
// @access  Private (Admin only)
router.delete('/skills/:categoryId/skills/:skillId', auth, adminOnly, async (req, res) => {
  try {
    const { categoryId, skillId } = req.params;
    
    const skillCategory = await Skill.findById(categoryId);
    if (!skillCategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Skill category not found'
      });
    }
    
    const skillIndex = skillCategory.skills.findIndex(skill => skill._id.toString() === skillId);
    if (skillIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Skill not found'
      });
    }
    
    // Remove the skill
    skillCategory.skills.splice(skillIndex, 1);
    await skillCategory.save();

    const updatedSkills = await Skill.find({ isActive: true }).sort({ order: 1 });

    res.json({
      status: 'success',
      message: 'Skill deleted successfully',
      data: updatedSkills
    });
  } catch (error) {
    console.error('Skill deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/portfolio/skills/categories
// @desc    Create new skill category
// @access  Private (Admin only)
router.post('/skills/categories', auth, adminOnly, async (req, res) => {
  try {
    const { category, description, order } = req.body;
    
    // Validate category name
    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Category name is required'
      });
    }
    
    // Check if category already exists
    const existingCategory = await Skill.findOne({ category: category.toLowerCase() });
    if (existingCategory) {
      return res.status(400).json({
        status: 'error',
        message: 'Category already exists'
      });
    }
    
    // Create new category
    const newCategory = new Skill({
      category: category.toLowerCase(),
      description: description || '',
      skills: [],
      order: order || 0,
      isActive: true
    });
    
    await newCategory.save();

    const updatedSkills = await Skill.find({ isActive: true }).sort({ order: 1 });

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: updatedSkills
    });
  } catch (error) {
    console.error('Category creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/skills/categories/:categoryId
// @desc    Update skill category
// @access  Private (Admin only)
router.put('/skills/categories/:categoryId', auth, adminOnly, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category, description, order, isActive } = req.body;
    
    const skillCategory = await Skill.findById(categoryId);
    if (!skillCategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }
    
    // Check if new category name conflicts with existing categories
    if (category && category !== skillCategory.category) {
      const existingCategory = await Skill.findOne({ 
        category: category.toLowerCase(),
        _id: { $ne: categoryId }
      });
      if (existingCategory) {
        return res.status(400).json({
          status: 'error',
          message: 'Category name already exists'
        });
      }
      skillCategory.category = category.toLowerCase();
    }
    
    if (description !== undefined) skillCategory.description = description;
    if (order !== undefined) skillCategory.order = order;
    if (isActive !== undefined) skillCategory.isActive = isActive;
    
    await skillCategory.save();

    const updatedSkills = await Skill.find({ isActive: true }).sort({ order: 1 });

    res.json({
      status: 'success',
      message: 'Category updated successfully',
      data: updatedSkills
    });
  } catch (error) {
    console.error('Category update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/portfolio/skills/categories/:categoryId
// @desc    Delete skill category (only if empty)
// @access  Private (Admin only)
router.delete('/skills/categories/:categoryId', auth, adminOnly, async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const skillCategory = await Skill.findById(categoryId);
    if (!skillCategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }
    
    // Check if category has skills
    if (skillCategory.skills && skillCategory.skills.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot delete category with existing skills. Please delete all skills first.'
      });
    }
    
    await Skill.findByIdAndDelete(categoryId);

    const updatedSkills = await Skill.find({ isActive: true }).sort({ order: 1 });

    res.json({
      status: 'success',
      message: 'Category deleted successfully',
      data: updatedSkills
    });
  } catch (error) {
    console.error('Category deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/skills
// @desc    Update skills (bulk)
// @access  Private (Admin only)
router.put('/skills', auth, adminOnly, async (req, res) => {
  try {
    const { skills } = req.body;
    
    // Update or create skills for each category
    for (const skillData of skills) {
      await Skill.findOneAndUpdate(
        { category: skillData.category },
        skillData,
        { upsert: true, new: true, runValidators: true }
      );
    }

    const updatedSkills = await Skill.find({ isActive: true }).sort({ order: 1 });

    res.json({
      status: 'success',
      message: 'Skills updated successfully',
      data: updatedSkills
    });
  } catch (error) {
    console.error('Skills update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ==================== EDUCATION SECTION ====================

// @route   GET /api/portfolio/education
// @desc    Get all education entries
// @access  Public
router.get('/education', async (req, res) => {
  try {
    const education = await Education.find({ isActive: true }).sort({ order: 1, endDate: -1 });
    
    res.json({
      status: 'success',
      count: education.length,
      data: education
    });
  } catch (error) {
    console.error('Education fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/portfolio/education
// @desc    Create new education entry
// @access  Private (Admin only)
router.post('/education', auth, adminOnly, validate(portfolioSchemas.education), async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();

    res.status(201).json({
      status: 'success',
      message: 'Education created successfully',
      data: education
    });
  } catch (error) {
    console.error('Education creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/education/:id
// @desc    Update education entry
// @access  Private (Admin only)
router.put('/education/:id', auth, adminOnly, validate(portfolioSchemas.education), async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({
        status: 'error',
        message: 'Education not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Education updated successfully',
      data: education
    });
  } catch (error) {
    console.error('Education update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/portfolio/education/:id
// @desc    Delete education entry
// @access  Private (Admin only)
router.delete('/education/:id', auth, adminOnly, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!education) {
      return res.status(404).json({
        status: 'error',
        message: 'Education not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Education deleted successfully'
    });
  } catch (error) {
    console.error('Education deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ==================== ACHIEVEMENTS SECTION ====================

// @route   GET /api/portfolio/achievements
// @desc    Get all achievements
// @access  Public
router.get('/achievements', async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true }).sort({ order: 1, date: -1 });
    
    res.json({
      status: 'success',
      count: achievements.length,
      data: achievements
    });
  } catch (error) {
    console.error('Achievements fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/portfolio/achievements
// @desc    Create new achievement
// @access  Private (Admin only)
router.post('/achievements', auth, adminOnly, validate(portfolioSchemas.achievement), async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();

    res.status(201).json({
      status: 'success',
      message: 'Achievement created successfully',
      data: achievement
    });
  } catch (error) {
    console.error('Achievement creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/achievements/:id
// @desc    Update achievement
// @access  Private (Admin only)
router.put('/achievements/:id', auth, adminOnly, validate(portfolioSchemas.achievement), async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({
        status: 'error',
        message: 'Achievement not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Achievement updated successfully',
      data: achievement
    });
  } catch (error) {
    console.error('Achievement update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/portfolio/achievements/:id
// @desc    Delete achievement
// @access  Private (Admin only)
router.delete('/achievements/:id', auth, adminOnly, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!achievement) {
      return res.status(404).json({
        status: 'error',
        message: 'Achievement not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Achievement deleted successfully'
    });
  } catch (error) {
    console.error('Achievement deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ==================== LEADERSHIP SECTION ====================

// @route   GET /api/portfolio/leadership
// @desc    Get all leadership entries
// @access  Public
router.get('/leadership', async (req, res) => {
  try {
    const leadership = await Leadership.find({ isActive: true }).sort({ order: 1, startDate: -1 });
    
    res.json({
      status: 'success',
      count: leadership.length,
      data: leadership
    });
  } catch (error) {
    console.error('Leadership fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/portfolio/leadership
// @desc    Create new leadership entry
// @access  Private (Admin only)
router.post('/leadership', auth, adminOnly, validate(portfolioSchemas.leadership), async (req, res) => {
  try {
    const leadership = new Leadership(req.body);
    await leadership.save();

    res.status(201).json({
      status: 'success',
      message: 'Leadership entry created successfully',
      data: leadership
    });
  } catch (error) {
    console.error('Leadership creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/portfolio/leadership/:id
// @desc    Update leadership entry
// @access  Private (Admin only)
router.put('/leadership/:id', auth, adminOnly, validate(portfolioSchemas.leadership), async (req, res) => {
  try {
    const leadership = await Leadership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!leadership) {
      return res.status(404).json({
        status: 'error',
        message: 'Leadership entry not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Leadership entry updated successfully',
      data: leadership
    });
  } catch (error) {
    console.error('Leadership update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/portfolio/leadership/:id
// @desc    Delete leadership entry
// @access  Private (Admin only)
router.delete('/leadership/:id', auth, adminOnly, async (req, res) => {
  try {
    const leadership = await Leadership.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!leadership) {
      return res.status(404).json({
        status: 'error',
        message: 'Leadership entry not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Leadership entry deleted successfully'
    });
  } catch (error) {
    console.error('Leadership deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
