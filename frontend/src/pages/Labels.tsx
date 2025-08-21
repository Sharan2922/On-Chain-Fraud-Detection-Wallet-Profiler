import { motion } from 'framer-motion';
import { LabelsTable } from '../components/labels/LabelsTable';

export const Labels = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Address Labels</h1>
          <p className="text-gray-400">
            Manage and categorize addresses for enhanced tracking and analysis
          </p>
        </div>

        <LabelsTable />
      </motion.div>
    </div>
  );
};