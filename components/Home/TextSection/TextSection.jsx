import styles from './styles.module.scss'
import Button from '@/components/Home/Button/Button'

export default function TextSection() {
    const btns = [
        { label: 'READ CASE STUDY', btnVariant: 'containedBWBordered' },
        { label: 'TRY IT NOW', link: 'https://documentation.confident-ai.com', btnVariant: 'outlinedBWBordered' },
    ]
    return (
        <div className={styles.textSection}>
            <div className={styles.inner}>
                <div className={styles.textWrap}>
                    <span className={styles.subHeading} style={{ color: '#ffb62e' }}>USE CASES</span>
                    <h2 className={styles.heading}>
                        Build your AI moat.<br />
                        Do evals the right way.
                    </h2>
                    <p className={styles.description}>
                        Confident AI provides an opinionated solution to curate dataset, align metrics, and automate LLM testing with tracing. <br />
                        Teams use it to safeguard AI systems to <b>save hundreds of hours a week</b> on fixing breaking changes, <b> cut inference <br />
                            cost by 80%</b>, and convince stakeholders that their AI is always better than the week before.
                    </p>
                    <div className={styles.buttonWrap}>

                        <Button
                            to='https://confident-ai.com/case-study/supernormal'
                            variant='outlined'
                            color='primary'
                            label='READ CASE STUDY'
                            sizes='lg'
                            curved
                            bordered
                            style={{ boxShadow: '0 0 4px #fff', fontWeight: '700'}}
                        />
                        <Button
                            to='https://documentation.confident-ai.com'
                            variant='outlined'
                            color='secondary'
                            curved
                            bordered
                            label='TRY IT NOW'
                            sizes='lg'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};