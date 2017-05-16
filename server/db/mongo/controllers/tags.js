import Tag from '../models/tag';

/**
 * List
 */
export function all(req, res) {
  Tag.find({}).exec((err, tags) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(tags);
  });
}

/**
 * Add a Tag
 */
export function add(req, res) {
  Tag.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

/**
 * Remove a tag
 */
export function remove(req, res) {
  const query = { id: req.params.id };
  Tag.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  remove
};
