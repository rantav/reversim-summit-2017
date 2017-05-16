import _ from 'lodash';
import Proposal from '../models/proposal';
import User from '../models/user';
import {transformProposal, transformUser} from './helpers';

/**
 * List
 */
export function all(req, res) {
  Proposal.find({ status: { $ne: 'rejected' } }, null, { sort: { created_at: -1 } }).populate('speaker_ids').exec((err, proposals) => {
    if (err) {
      console.log(`Error in proposals/all query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    }

    let result = proposals.map(proposal => transformProposal(proposal, req.user, req.query && req.query.overrideDetails === 'true'));

    if (req.query.group === 'tags') {
      const groups = {};

      result.forEach(proposal => {
        if (proposal.tags === undefined || proposal.tags.length === 0) {
          groups['Untagged'] = groups['Untagged'] || [];
          groups['Untagged'].push(proposal);
        } else {
          proposal.tags.forEach(tag => {
            groups[tag] = groups[tag] || [];
            groups[tag].push(proposal);
          });
        }
      });

      result = groups;
    }

    return res.json(result);
  });
}

/**
 * Single Proposal
 */
export function get(req, res) {
  Proposal.findOne({ id: req.params.id}).populate('speaker_ids').exec((err, proposal) => {
    if (err) {
      console.log(`Error in proposals/get query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(transformProposal(proposal, req.user));
  });
}

/**
 * Add a Proposal
 */
export function add(req, res) {
  let proposal = _.clone(req.body);

  proposal.created_at = new Date();
  proposal.updated_at = new Date();

  console.log('adding new proposal ' + JSON.stringify(proposal));

  Proposal.create(proposal, (err, model) => {
    if (err) {
      console.log(`Error in proposals/add query: ${err}`);
      return res.status(500).send('Something went wrong');
    }

    // Update speakers proposals
    proposal.speaker_ids.forEach(speakerId => {
      User.findByIdAndUpdate(
        speakerId,
        { $push: { proposals: model._id} },
        { safe: true, upsert: true },
        (err, model) => {
          if (err) {
            console.log(`Error in proposals/add/updateUser query: ${err}`);
            return res.status(500).send('Something went wrong');
          }
        }
      );
    });

    return res.status(200).send('OK');
  });
}

/**
 * Update a proposal
 */
export function update(req, res) {
  const omitKeys = ['id', '_id', '_v'];
  req.body.updated_at = new Date();
  const data = _.omit(req.body, omitKeys);

  Proposal.findOneAndUpdate({ id: req.params.id }, data, (err, obj) => {
    if (err) {
      console.log(`Error in proposals/update query: ${err}`);
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.status(200).send('Updated successfully');
  });
}

/**
 * Remove a proposal
 */
export function remove(req, res) {
  const query = { id: req.params.id };
  console.log('removing proposal ' + JSON.stringify(query));
  Proposal.findOneAndRemove(query, (err) => {
    if (err) {
      console.log(`Error in proposals/remove query: ${err}`);
      return res.status(500).send('Something went wrong');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  get,
  add,
  update,
  remove
};
