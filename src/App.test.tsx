import renderer from 'react-test-renderer';
import CalculatingMachine from './components/CalculatingMachine';

test('renders App snapshot', () => {
    const app = renderer.create(
        <div className="App">
            <div className='machine-container'>
                <CalculatingMachine />
            </div>
        </div>
    );
    const tree = app.toJSON();
    expect(tree).toMatchSnapshot();
});
