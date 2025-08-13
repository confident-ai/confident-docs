import React from 'react';
import styles from './styles.module.scss';

const ComparisonTable = ({ leftHeading, rightHeading, leftItems = [], rightItems = [] }) => {
  return (
    <div className={styles.comparisonTableContainer}>
      <div className={styles.comparisonTable}>
        <div className={styles.comparisonHeaders}>
          <div className={styles.comparisonHeader}>
            {leftHeading}
          </div>
          <div className={styles.comparisonHeader}>
            {rightHeading}
          </div>
        </div>

        <div className={styles.comparisonColumns}>
          <div className={styles.comparisonColumn}>
            <ul className={styles.comparisonList}>
              {leftItems.map((item, index) => (
                <li key={`left-${index}`} className={styles.comparisonItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.comparisonColumn}>
            <ul className={styles.comparisonList}>
              {rightItems.map((item, index) => (
                <li key={`right-${index}`} className={styles.comparisonItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable; 