const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
          res. json(courses);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v');
            
          if (!thought) {
             return res.status(404).json({ message: 'No thought found with that ID'});
          }

          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    async deleteThought(req, res) {
        try {
           const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
           
           if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
           }

           const user = await user.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true}
           );

           if (!user) {
            return res.status(404).json({
                message: 'Thought deleted, but no users found',
            });
        }

            res.json({ message: 'Thought deleted successfully' });
           } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );

          if (!thought) {
            res.status(404).json({ message: 'No thought with this id' });
          }

          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },


async addReaction (req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID :(' });
        }

        res.json(thought);
    }   catch (err) {
        res.status(500).json(err);
    }
},

async removeReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.studentId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID :(' });
        }

        res.json(thought);
    }   catch (err) {
        res.status(500).json(err);
        }
    },
};