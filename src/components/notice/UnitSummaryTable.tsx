import type { UnitSummary } from '../../types/notice';

export default function UnitSummaryTable({ units }: { units: UnitSummary[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>면적</th>
            <th>세대수</th>
            <th>금액</th>
            <th>임대료</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.areaType}>
              <td>{unit.areaType}</td>
              <td className="number">{unit.supplyCount}세대</td>
              <td className="amount">{unit.estimatedPriceText ?? unit.depositText ?? '확인 필요'}</td>
              <td className="amount">{unit.monthlyRentText ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
