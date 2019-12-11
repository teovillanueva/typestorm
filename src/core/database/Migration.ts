abstract class Migration {
	public abstract async up(): Promise<void>;

	public abstract async down(): Promise<void>;
}

export default Migration;
